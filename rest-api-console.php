<?php
/**
 * Plugin Name: REST API Console
 * Plugin URI:  http://wordpress.org/plugins/rest-api-console/
 * Description: A console for your REST API.
 * Version:     2.0.1
 * Author:      WP REST API Team
 * Author URI:  http://wp-api.org/
 * License:     GPL v2 or later
 * Text Domain: rest-api-console
 * Domain Path: /language
 */

class WP_REST_Console {
	public static $path;

	public function __construct() {
		self::$path = __FILE__;

		add_action( 'admin_menu', array( $this, 'admin_init' ) );
		add_action( 'load-tools_page_rest_api_console', array( $this, 'maybe_render_iframe' ) );
	}

	public function admin_init() {
		$hook = add_management_page( 'REST API Console', 'REST API Console', 'manage_options', 'rest_api_console', array( $this, 'render_page' ) );

		add_action( 'admin_print_styles-' . $hook, array( $this, 'register_styles' ) );
	}

	public function register_styles() {
		wp_enqueue_style( 'rest-api-console-page', plugins_url( 'build/page.min.css', self::$path ) );
	}

	public function maybe_render_iframe() {
		if ( ! isset( $_GET['iframe'] ) ) {
			return;
		}
		include( __DIR__ . '/templates/views/app.php' );
		exit;
	}

	public function render_page() {
		$url = add_query_arg( 'iframe', 'yesplease' );
		?>
		<iframe src="<?php echo esc_url( $url ) ?>" style="width: 100%; height: 600px;"></iframe>
		<?php
	}

	public static function instance() {
		static $instance = null;

		if ( is_null( $instance ) ) {
			$instance = new self();
		}

		return $instance;
	}
}


if ( is_admin() ) {
	WP_REST_Console::instance();
}
