-- Base de datos para Sistema de Gestión de Distritos
-- Compatible con phpMyAdmin

DROP DATABASE IF EXISTS ventas_db;
CREATE DATABASE ventas_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ventas_db;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- =========================
-- TABLA: distritos
-- =========================
CREATE TABLE IF NOT EXISTS distritos (
  id_dis INT(11) NOT NULL AUTO_INCREMENT,
  nom_dis VARCHAR(100) DEFAULT NULL,
  cod_postal VARCHAR(10) DEFAULT NULL,
  poblacion INT NOT NULL,
  PRIMARY KEY (id_dis)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================
-- DATOS DE EJEMPLO
-- =========================
INSERT INTO distritos (id_dis, nom_dis, cod_postal, poblacion) VALUES
(1, 'Miraflores', '15077', 50000),
(2, 'San Isidro', '15073', 100000),
(3, 'Surco', '15023', 200000),
(4, 'Barranco', '15063', 42141),
(5, 'La Molina', '15026', 354643),
(6, 'San Borja', '15036', 10000),
(7, 'Jesús María', '15072', 333333),
(8, 'Lince', '15046', 123414),
(9, 'Pueblo Libre', '15084', 6573535),
(10, 'Magdalena', '15086', 12421),
(11, 'San Miguel', '15088', 2010),
(12, 'Chorrillos', '15064', 45124),
(13, 'Rímac', '15093', 99999),
(14, 'Breña', '15082', 3000),
(15, 'Callao', '07001', 777),
(16, 'Ventanilla', '07036', 421091),
(17, 'Los Olivos', '15301', 321532),
(18, 'Comas', '15311', 363241),
(19, 'Carabayllo', '15318', 4647242),
(20, 'Independencia', '15331', 4213252),
(21, 'Ate', '15487', 12073),
(22, 'Santa Anita', '15011', 463421),
(23, 'El Agustino', '15006', 654),
(24, 'San Juan de Lurigancho', '15401', 141234),
(25, 'Villa El Salvador', '15834', 152353),
(26, 'San Juan De Miraflores', '49532', 53562),
(27, 'Santiago de Surco', '15023', 10492),
(29, 'DistritoPrueba', '12345', 103103),
(30, 'Prueba02', '31313', 312410);

-- =========================
-- PROCEDIMIENTOS ALMACENADOS (RUTINAS)
-- =========================
DELIMITER $$

-- Crear distrito
CREATE PROCEDURE sp_crear_distrito (
    IN p_nom_dis VARCHAR(100),
    IN p_cod_postal VARCHAR(10),
    IN p_poblacion INT
)
BEGIN
    INSERT INTO distritos (nom_dis, cod_postal, poblacion)
    VALUES (p_nom_dis, p_cod_postal, p_poblacion);
END$$

-- Actualizar distrito
CREATE PROCEDURE sp_actualizar_distrito (
    IN p_id_dis INT,
    IN p_nom_dis VARCHAR(100),
    IN p_cod_postal VARCHAR(10),
    IN p_poblacion INT
)
BEGIN
    UPDATE distritos 
    SET nom_dis = p_nom_dis,
        cod_postal = p_cod_postal,
        poblacion = p_poblacion
    WHERE id_dis = p_id_dis;
END$$

-- Eliminar distrito
CREATE PROCEDURE sp_eliminar_distrito (
    IN p_id_dis INT
)
BEGIN
    DELETE FROM distritos WHERE id_dis = p_id_dis;
END$$

-- Obtener distrito por ID
CREATE PROCEDURE sp_obtener_distrito (
    IN p_id_dis INT
)
BEGIN
    SELECT * FROM distritos WHERE id_dis = p_id_dis;
END$$

-- Listar distritos con paginación y búsqueda
CREATE PROCEDURE sp_listar_distritos (
    IN p_search VARCHAR(100),
    IN p_page INT,
    IN p_limit INT
)
BEGIN
    DECLARE v_offset INT;
    DECLARE v_search VARCHAR(100)
        CHARACTER SET utf8mb4
        COLLATE utf8mb4_unicode_ci;
    
    SET v_search = CONCAT('%', IFNULL(p_search, ''), '%');
    SET p_page = IFNULL(p_page, 1);
    SET p_page = IF(p_page < 1, 1, p_page);
    SET p_limit = IFNULL(p_limit, 10);
    SET p_limit = IF(p_limit < 1, 10, p_limit);
    SET v_offset = (p_page - 1) * p_limit;
    SET v_offset = IF(v_offset < 0, 0, v_offset);
    
    SELECT * FROM distritos
    WHERE CAST(id_dis AS CHAR) COLLATE utf8mb4_unicode_ci LIKE v_search
       OR nom_dis COLLATE utf8mb4_unicode_ci LIKE v_search
       OR cod_postal COLLATE utf8mb4_unicode_ci LIKE v_search
    LIMIT p_limit OFFSET v_offset;
END$$

-- Contar distritos (para paginación)
CREATE PROCEDURE sp_contar_distritos (
    IN p_search VARCHAR(100)
)
BEGIN
    DECLARE v_search VARCHAR(100)
        CHARACTER SET utf8mb4
        COLLATE utf8mb4_unicode_ci;
    
    SET v_search = CONCAT('%', IFNULL(p_search, ''), '%');
    
    SELECT COUNT(*) AS total
    FROM distritos
    WHERE CAST(id_dis AS CHAR) COLLATE utf8mb4_unicode_ci LIKE v_search
       OR nom_dis COLLATE utf8mb4_unicode_ci LIKE v_search
       OR cod_postal COLLATE utf8mb4_unicode_ci LIKE v_search;
END$$

DELIMITER ;

COMMIT;
