BIN = ./node_modules/.bin
JS_SRC = $(shell find src -type f -name "*.js")
CSS_SRC = $(shell find src/assets/css -type f -name "*.css")
FONTS_SRC := $(shell find src/assets/font -type f -name "*.ttf" -o -name "*.eot" -o -name "*.woff" -o -name "*.svg")
FONTS_DIST := $(patsubst src/assets/%,dist/%,$(FONTS_SRC))

DIST   := dist
JS_MIN := $(DIST)/werdup.min.js
JS_FULL:= $(DIST)/werdup.js
CSS_MIN:= $(DIST)/css/werdup.css
INDEX  := $(DIST)/index.html

.PHONY: build clean

build: $(JS_MIN) $(CSS_MIN) $(INDEX) $(FONTS_DIST)
	@#

clean:
	rm -rf dist

$(JS_MIN): $(JS_FULL)
	cat src/jquery-2.1.3.min.js src/materialize.min.js $(JS_FULL) | $(BIN)/uglifyjs --compress warnings=false --mangle -- - > $@
	@echo "JS: `gzip -c $@ | wc -c` bytes gzipped."

$(JS_FULL): $(JS_SRC)
	@mkdir -p dist
	$(BIN)/browserify src/app.js -o dist/werdup.js

$(CSS_MIN): $(CSS_SRC)
	@mkdir -p dist/css
	$(BIN)/cleancss -o $@ --skip-rebase src/assets/css/main.css
	@echo "CSS: `gzip -c $@ | wc -c` bytes gzipped."

dist/font/%: src/assets/font/%
	@mkdir -p $(@D)
	cp $< $@

$(INDEX): index.prod.html
	@mkdir -p $(@D)
	cp $< $@
