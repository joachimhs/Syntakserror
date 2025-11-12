CREATE DATABASE IF NOT EXISTS syntakserror;

CREATE USER IF NOT EXISTS 'syntakserror'@'%' IDENTIFIED BY 'syntakserror';
GRANT ALL PRIVILEGES ON syntakserror.* TO 'syntakserror'@'%';
FLUSH PRIVILEGES;
