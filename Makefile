qa:
	gulp build-debug
prod:
	gulp build-debug
	gulp uglify
	gulp replace
mprod:
	gulp build-debug
	gulp uglify
	gulp replace
	rm -rf public/assets/images/pages/home-page
	
