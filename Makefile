DIST    := dist
JS_MIN  := $(DIST)/werdup.min.js
JS_FULL := $(DIST)/werdup.js

CSS_MIN := $(DIST)/css/werdup.css
INDEX   := $(DIST)/index.html
BIN 	  := ./node_modules/.bin

JS_SRC     := $(shell find src -type f -name "*.js")
CSS_SRC    := $(shell find src/assets/css -type f -name "*.css")
FONTS_SRC  := $(shell find src/assets/font -type f -name "*.ttf" -o -name "*.woff")
FONTS_DIST := $(patsubst src/assets/%,$(DIST)/%,$(FONTS_SRC))

JS_DEV_FILES := $(DIST)/jquery-2.1.3.min.js $(DIST)/materialize.min.js

ifeq ($(NODE_ENV), development)
	JS := $(JS_FULL) $(JS_DEV_FILES)
	CLEANCSS_OPTIONS := --sourcemap --keep-line-breaks --debug
else
	JS := $(JS_MIN)
	CLEANCSS_OPTIONS :=
endif

.PHONY: all build clean gh-pages watch requires-production

all: build

build: $(JS) $(CSS_MIN) $(INDEX) $(FONTS_DIST) $(DIST)/favicon.ico $(DIST)/werdup.appcache
	@#

clean:
	rm -rf $(DIST)

watch:
	@watchman watch $(PWD)
	@echo '["trigger", "$(PWD)", {"name":"rebuild","expression": ["match", "src/**/*.*", "wholename"],"append_files":false,"command":["make"]}]' | watchman -j
	@echo 'Watching $(PWD) for changes'

stop-watching:
	watchman watch-del $(PWD)

requires-production:
ifneq ($(NODE_ENV), production)
	@echo "Requires NODE_ENV=production"
	@exit 1
endif

gh-pages: | requires-production clean build
	git checkout --orphan gh-pages master && \
	rm -f .git/index && \
	rm $(DIST)/werdup.js && \
	cp -r $(DIST)/** . && \
	git add index.html css/ font/ favicon.ico werdup.appcache werdup.min.js && \
	git commit -m "Automatic update" && \
	git push --force origin gh-pages && \
	git checkout master -f && \
	git branch -D gh-pages

$(JS_MIN): $(JS_FULL)
	cat src/jquery-2.1.3.min.js src/materialize.min.js $(JS_FULL) | $(BIN)/uglifyjs --compress warnings=false --mangle -- - > $@
	@echo "JS: `gzip -c $@ | wc -c` bytes gzipped."

$(JS_FULL): $(JS_SRC)
	@mkdir -p $(@D)
	$(BIN)/browserify src/app.js -d -o $@

$(CSS_MIN): $(CSS_SRC)
	@mkdir -p $(@D)
	$(BIN)/cleancss -o $@ --skip-rebase $(CLEANCSS_OPTIONS) src/assets/css/main.css
	@echo "CSS: `gzip -c $@ | wc -c` bytes gzipped."

$(INDEX): src/index.tmpl
	@mkdir -p $(@D)
	$(BIN)/htmlprocessor $< --output $@ --env $(NODE_ENV) --strip

$(DIST)/font/%: src/assets/font/%
	@mkdir -p $(@D)
	cp $< $@

$(DIST)/favicon.ico: src/favicon.ico
	@mkdir -p $(@D)
	cp $< $@

$(DIST)/werdup.appcache: src/werdup.appcache.tmpl
	@mkdir -p $(@D)
	cp $< $@

$(DIST)/jquery-2.1.3.min.js: src/jquery-2.1.3.min.js
	@mkdir -p $(@D)
	cp $< $@

$(DIST)/materialize.min.js: src/materialize.min.js
	@mkdir -p $(@D)
	cp $< $@

