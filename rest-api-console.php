<?php
/**
 * Plugin Name: REST API Console
 * Plugin URI:  http://wordpress.org/plugins/rest-api-console/
 * Description: A console for your REST API.
 * Version:     1
 * Author:      wordpressdotorg, automattic
 * Author URI:  http://wordpress.org/
 * License:     GPL v2 or later
 * Text Domain: rest-api-console
 * Domain Path: /language
 */

class WP_API_Console {
	public static $path;

	public function __construct() {
		self::$path = __FILE__;

		add_action( 'admin_menu', array( $this, 'admin_init' ) );
		add_action( 'load-tools_page_rest_api_console', array( $this, 'render' ) );
	}

	public function admin_init() {
		$hook = add_management_page( 'Rest API Console', 'Rest API Console', 'manage_options', 'rest_api_console', array( $this, 'render_page' ) );
	}

	public function render() {
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

	static function instance() {
		static $instance = null;

		if ( is_null( $instance ) ) {
			$instance = new WP_API_Console();
		}

		return $instance;
	}
}


if ( is_admin() ) {
	WP_API_Console::instance();
}