module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'build/style.min.css': 'templates/sass/**/*.scss'
				}
			}
		},
		browserify: {
			dist: {
				files: {
					'build/app.min.js': 'lib/app.js',
					'build/search.min.js': 'lib/search.js'
				},
				options: {
					transform: ['uglifyify']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.loadNpmTasks('grunt-browserify');

	// Default task(s).
	grunt.registerTask('default', ['sass', 'browserify']);

};
