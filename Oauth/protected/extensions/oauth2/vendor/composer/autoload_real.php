<?php

// autoload_real.php @generated by Composer



class ComposerAutoloaderInitf9bd5b92a76357ef25de96c18ce0fbc2 {

    private static $loader;

    public static function loadClassLoader($class) {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    public static function getLoader() {
        if (null !== self::$loader) {
            return self::$loader;
        }

        spl_autoload_register(array('ComposerAutoloaderInitf9bd5b92a76357ef25de96c18ce0fbc2', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader();
        spl_autoload_unregister(array('ComposerAutoloaderInitf9bd5b92a76357ef25de96c18ce0fbc2', 'loadClassLoader'));

        $map = require __DIR__ . '/autoload_namespaces.php';
        foreach ($map as $namespace => $path) {
            $loader->set($namespace, $path);
        }

        $map = require __DIR__ . '/autoload_psr4.php';
        foreach ($map as $namespace => $path) {
            $loader->setPsr4($namespace, $path);
        }

        $classMap = require __DIR__ . '/autoload_classmap.php';
        if ($classMap) {
            $loader->addClassMap($classMap);
        }

        $loader->register(true);

        $includeFiles = require __DIR__ . '/autoload_files.php';
        foreach ($includeFiles as $file) {
            composerRequiref9bd5b92a76357ef25de96c18ce0fbc2($file);
        }

        return $loader;
    }

}

function composerRequiref9bd5b92a76357ef25de96c18ce0fbc2($file) {
    require $file;
}
