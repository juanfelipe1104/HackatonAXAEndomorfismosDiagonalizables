DROP DATABASE IF EXISTS municipiosDB;
CREATE DATABASE municipiosDB;
USE municipiosDB;

CREATE TABLE municipio(
CODAUTO INT,
CPRO INT,
CMUN INT,
DC INT,
NOMBRE varchar(150)
);

LOAD DATA INFILE '/var/lib/mysql-files/diccionario24.csv'
INTO TABLE municipio
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\n';

UPDATE municipio SET NOMBRE = TRIM(REPLACE(REPLACE(REPLACE(NOMBRE, CHAR(10), ''), CHAR(13), ''), CHAR(9), ''));

UPDATE municipio
SET NOMBRE = CONCAT(SUBSTRING_INDEX(NOMBRE, ', ', -1), ' ', SUBSTRING_INDEX(NOMBRE, ', ', 1))
WHERE NOMBRE LIKE '%, %';


CREATE VIEW vista_municipios AS
SELECT
    NOMBRE,
    CPRO,
    CMUN,
    LPAD(CONCAT(CPRO, LPAD(CMUN, 3, '0')), 5, '0') AS codigo_completo
FROM municipio;

