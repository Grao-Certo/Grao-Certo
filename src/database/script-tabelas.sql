CREATE DATABASE graoCerto;
USE graoCerto;

CREATE TABLE empresa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    cnpj CHAR(14) UNIQUE,
    email VARCHAR(100) UNIQUE,
    cep CHAR(8),
    numero_endereco VARCHAR(5),
    complemento_endereco VARCHAR(60)
);

CREATE TABLE
    usuario (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(100),
        cpf CHAR(14) UNIQUE,
        email VARCHAR(100) UNIQUE,
        senha CHAR(60),
        tipo_usuario VARCHAR(20),
        fk_empresa INT,
        CONSTRAINT chk_tipo_usuario CHECK (tipo_usuario IN ('administrador', 'operador', 'suporte')),
        FOREIGN KEY (fk_empresa) REFERENCES empresa (id)
    );

CREATE TABLE telefone (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero VARCHAR(11),
    tipo VARCHAR(20),
    fk_empresa INT,
    fk_usuario INT,
    CONSTRAINT chk_tipo_telefone CHECK (
        tipo IN ('empresa', 'pessoal')
    ),
    FOREIGN KEY (fk_empresa) REFERENCES empresa (id),
    FOREIGN KEY (fk_usuario) REFERENCES usuario (id)
);

CREATE TABLE silo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    altura_total DECIMAL(5, 2),
    comprimento DECIMAL(5, 2),
    largura DECIMAL(5, 2),
    raio DECIMAL(5, 2),
    altura_cone DECIMAL(5, 2),
    fk_empresa INT,
    FOREIGN KEY (fk_empresa) REFERENCES empresa (id)
);

CREATE TABLE sensor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    status_sensor VARCHAR(20),
    data_instalacao DATE,
    fk_silo INT,
    CONSTRAINT chk_status_sensor CHECK (
        status_sensor IN ('ativo','inativo','manutencao','instalacao')
    ),
    FOREIGN KEY (fk_silo) REFERENCES silo (id)
);

CREATE TABLE telemetria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    distancia_superficie DECIMAL(5, 2),
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_sensor INT,
    FOREIGN KEY (fk_sensor) REFERENCES sensor (id)
);

INSERT INTO empresa (nome, cnpj, email, cep, numero_endereco, complemento_endereco) VALUES
('AgroTech Soluções','12345678000101','contato@agrotech.com','04567010','120','Galpão A'),
('Silos Brasil LTDA','98765432000199','financeiro@silosbrasil.com','03312040','450',NULL),
('Armazéns do Campo','11223344000155','suporte@armazens.com','06789030','78','Bloco 2');

INSERT INTO usuario (nome, email, senha, tipo_usuario, cpf, fk_empresa) VALUES 
('Carlos Mendes','carlos@agrotech.com','$2a$12$hashfake1','administrador','11111111111111',1),
('Ana Souza','ana@agrotech.com','$2a$12$hashfake2','operador','22222222222222',1),
('Bruno Lima','bruno@silosbrasil.com','$2a$12$hashfake3','administrador','33333333333333',2),
('Fernanda Alves','fernanda@armazens.com','$2a$12$hashfake4','operador','44444444444444',3),
('Roberto Santos', 'roberto@armazens.com', '$2a$12$hashfake5', 'administrador', '34567890123', 3);

INSERT INTO usuario (nome, email, senha, tipo_usuario) VALUES 
('Lucas Veneroso', 'lucas.veneroso@sptech.school', '@Senha123', 'suporte'),
('Matheus dos Santos', 'matheus.sferreira@sptech.school', '@Senha123', 'suporte'),
('Dayvid Dias', 'dayvid.dias@sptech.school', '@Senha123', 'suporte'),
('Yasmin Oda', 'yasmin.lima@sptech.school', '@Senha123', 'suporte'),
('Victor Mendes', 'victor.bertolino@sptech.school', '@Senha123', 'suporte'),
('Pedro Assis', 'pedro.dlima@sptech.school', '@Senha123', 'suporte');
INSERT INTO telefone (numero, tipo, fk_empresa, fk_usuario) VALUES 
('11987654321', 'empresa', 1, NULL),
('11911112222', 'pessoal', NULL, 1),
('11933334444', 'pessoal', NULL, 2),
('11955556666', 'empresa', 2, NULL),
('11977778888', 'empresa', 3, NULL),
('11999990000', 'pessoal', NULL, 4);

INSERT INTO silo (altura_total, comprimento, largura, raio, altura_cone, fk_empresa) VALUES
(4.00, 2.00, 12.00, 8.00, 0.90, 1),
(12.50, 4.50, 4.50, 4.50, 2.50, 1),
(10.00, 4.00, 4.00, 4.00, 2.00, 1),
(13.00, 5.00, 5.00, 5.00, 3.00, 2),
(12.50, 5.50, 5.50, 5.50, 3.50, 2),
(11.00, 5.00, 5.00, 5.00, 3.00, 2),
(15.00, 6.00, 6.00, 6.00, 4.00, 3),
(12.00, 5.00, 5.00, 5.00, 3.00, 3),
(10.00, 4.00, 4.00, 4.00, 2.00, 3);

INSERT INTO sensor (status_sensor, data_instalacao, fk_silo) VALUES
('ativo', '2024-06-02', 1),
('ativo', '2025-12-14', 2),
('ativo', '2026-06-01', 3),
('ativo', '2024-09-13', 4),
('ativo', '2025-7-04', 5),
('ativo', '2026-03-12', 6),
('ativo', '2025-11-12', 7),
('ativo', '2026-02-05', 8),
('ativo', '2026-06-02', 9);

INSERT INTO telemetria (distancia_superficie, data_hora, fk_sensor) VALUES
(3.09, '2025-01-15 10:00:00', 1),
(3.21, '2025-02-15 10:00:00', 1),
(3.18, '2025-03-15 10:00:00', 1),
(2.42, '2025-04-15 10:00:00', 1),
(2.45, '2025-05-15 10:00:00', 1),
(2.16, '2025-06-15 10:00:00', 1),
(3.11, '2025-07-15 10:00:00', 1),
(1.46, '2025-08-15 10:00:00', 1),
(3.15, '2025-09-15 10:00:00', 1),
(2.02, '2025-10-15 10:00:00', 1),
(1.49, '2025-11-15 10:00:00', 1),
(2.39, '2025-12-15 10:00:00', 1),
(2.25, '2026-01-15 10:00:00', 1),
(1.55, '2026-02-15 10:00:00', 1),
(2.05, '2026-03-15 10:00:00', 1),
(2.15, '2026-04-15 10:00:00', 1),
(1.27, '2026-05-15 10:00:00', 1);

INSERT INTO telemetria (distancia_superficie, data_hora, fk_sensor) VALUES
(4.51, '2025-01-15 10:00:00', 2),
(5.43, '2025-02-15 10:00:00', 2),
(4.10, '2025-03-15 10:00:00', 2),
(3.52, '2025-04-15 10:00:00', 2),
(3.94, '2025-05-15 10:00:00', 2),
(2.77, '2025-06-15 10:00:00', 2),
(2.37, '2025-07-15 10:00:00', 2),
(2.07, '2025-08-15 10:00:00', 2),
(2.21, '2025-09-15 10:00:00', 2),
(1.63, '2025-10-15 10:00:00', 2),
(1.50, '2025-11-15 10:00:00', 2),
(1.18, '2025-12-15 10:00:00', 2),
(1.14, '2026-01-15 10:00:00', 2),
(0.98, '2026-02-15 10:00:00', 2),
(1.22, '2026-03-15 10:00:00', 2),
(1.47, '2026-04-15 10:00:00', 2),
(1.21, '2026-05-15 10:00:00', 2);

INSERT INTO telemetria (distancia_superficie, data_hora, fk_sensor) VALUES
(5.21, '2025-01-15 10:00:00', 3),
(5.52, '2025-02-15 10:00:00', 3),
(3.92, '2025-03-15 10:00:00', 3),
(3.78, '2025-04-15 10:00:00', 3),
(3.09, '2025-05-15 10:00:00', 3),
(3.35, '2025-06-15 10:00:00', 3),
(2.67, '2025-07-15 10:00:00', 3),
(2.19, '2025-08-15 10:00:00', 3),
(1.82, '2025-09-15 10:00:00', 3),
(1.85, '2025-10-15 10:00:00', 3),
(1.36, '2025-11-15 10:00:00', 3),
(1.24, '2025-12-15 10:00:00', 3),
(1.50, '2026-01-15 10:00:00', 3),
(1.46, '2026-02-15 10:00:00', 3),
(0.99, '2026-03-15 10:00:00', 3),
(1.18, '2026-04-15 10:00:00', 3),
(1.35, '2026-05-15 10:00:00', 3);

INSERT INTO telemetria (distancia_superficie, data_hora, fk_sensor) VALUES
(1.47, '2025-01-15 10:00:00', 4),
(2.19, '2025-02-15 10:00:00', 4),
(2.50, '2025-03-15 10:00:00', 4),
(1.89, '2025-04-15 10:00:00', 4),
(2.26, '2025-05-15 10:00:00', 4),
(2.50, '2025-06-15 10:00:00', 4),
(3.39, '2025-07-15 10:00:00', 4),
(3.66, '2025-08-15 10:00:00', 4),
(3.49, '2025-09-15 10:00:00', 4),
(3.97, '2025-10-15 10:00:00', 4),
(4.27, '2025-11-15 10:00:00', 4),
(4.76, '2025-12-15 10:00:00', 4),
(5.72, '2026-01-15 10:00:00', 4),
(6.00, '2026-02-15 10:00:00', 4),
(6.00, '2026-03-15 10:00:00', 4),
(6.00, '2026-04-15 10:00:00', 4),
(6.00, '2026-05-15 10:00:00', 4);

INSERT INTO telemetria (distancia_superficie, data_hora, fk_sensor) VALUES
(1.66, '2025-01-15 10:00:00', 5),
(1.96, '2025-02-15 10:00:00', 5),
(2.91, '2025-03-15 10:00:00', 5),
(1.73, '2025-04-15 10:00:00', 5),
(2.63, '2025-05-15 10:00:00', 5),
(2.32, '2025-06-15 10:00:00', 5),
(2.86, '2025-07-15 10:00:00', 5),
(4.31, '2025-08-15 10:00:00', 5),
(3.80, '2025-09-15 10:00:00', 5),
(3.41, '2025-10-15 10:00:00', 5),
(4.07, '2025-11-15 10:00:00', 5),
(3.95, '2025-12-15 10:00:00', 5),
(5.30, '2026-01-15 10:00:00', 5),
(5.63, '2026-02-15 10:00:00', 5),
(6.00, '2026-03-15 10:00:00', 5),
(4.81, '2026-04-15 10:00:00', 5),
(6.00, '2026-05-15 10:00:00', 5);

INSERT INTO telemetria (distancia_superficie, data_hora, fk_sensor) VALUES
(1.25, '2025-01-15 10:00:00', 6),
(1.83, '2025-02-15 10:00:00', 6),
(2.38, '2025-03-15 10:00:00', 6),
(1.91, '2025-04-15 10:00:00', 6),
(2.08, '2025-05-15 10:00:00', 6),
(2.58, '2025-06-15 10:00:00', 6),
(2.90, '2025-07-15 10:00:00', 6),
(4.00, '2025-08-15 10:00:00', 6),
(3.50, '2025-09-15 10:00:00', 6),
(4.00, '2025-10-15 10:00:00', 6),
(4.00, '2025-11-15 10:00:00', 6),
(3.88, '2025-12-15 10:00:00', 6),
(4.00, '2026-01-15 10:00:00', 6),
(4.00, '2026-02-15 10:00:00', 6),
(4.00, '2026-03-15 10:00:00', 6),
(4.00, '2026-04-15 10:00:00', 6),
(4.00, '2026-05-15 10:00:00', 6);

INSERT INTO telemetria (distancia_superficie, data_hora, fk_sensor) VALUES
(6.34, '2025-01-15 10:00:00', 7),
(6.59, '2025-02-15 10:00:00', 7),
(5.83, '2025-03-15 10:00:00', 7),
(5.51, '2025-04-15 10:00:00', 7),
(6.02, '2025-05-15 10:00:00', 7),
(6.33, '2025-06-15 10:00:00', 7),
(5.46, '2025-07-15 10:00:00', 7),
(6.40, '2025-08-15 10:00:00', 7),
(6.57, '2025-09-15 10:00:00', 7),
(6.74, '2025-10-15 10:00:00', 7),
(6.59, '2025-11-15 10:00:00', 7),
(7.36, '2025-12-15 10:00:00', 7),
(7.41, '2026-01-15 10:00:00', 7),
(7.94, '2026-02-15 10:00:00', 7),
(8.51, '2026-03-15 10:00:00', 7),
(9.15, '2026-04-15 10:00:00', 7),
(8.80, '2026-05-15 10:00:00', 7);

INSERT INTO telemetria (distancia_superficie, data_hora, fk_sensor) VALUES
(5.45, '2025-01-15 10:00:00', 8),
(5.80, '2025-02-15 10:00:00', 8),
(4.86, '2025-03-15 10:00:00', 8),
(4.53, '2025-04-15 10:00:00', 8),
(6.16, '2025-05-15 10:00:00', 8),
(5.18, '2025-06-15 10:00:00', 8),
(5.54, '2025-07-15 10:00:00', 8),
(7.66, '2025-08-15 10:00:00', 8),
(6.83, '2025-09-15 10:00:00', 8),
(6.84, '2025-10-15 10:00:00', 8),
(6.29, '2025-11-15 10:00:00', 8),
(6.19, '2025-12-15 10:00:00', 8),
(7.24, '2026-01-15 10:00:00', 8),
(8.29, '2026-02-15 10:00:00', 8),
(9.55, '2026-03-15 10:00:00', 8),
(7.36, '2026-04-15 10:00:00', 8),
(7.31, '2026-05-15 10:00:00', 8);

INSERT INTO telemetria (distancia_superficie, data_hora, fk_sensor) VALUES
(5.76, '2025-01-15 10:00:00', 9),
(6.37, '2025-02-15 10:00:00', 9),
(5.48, '2025-03-15 10:00:00', 9),
(5.15, '2025-04-15 10:00:00', 9),
(6.84, '2025-05-15 10:00:00', 9),
(6.93, '2025-06-15 10:00:00', 9),
(4.81, '2025-07-15 10:00:00', 9),
(7.52, '2025-08-15 10:00:00', 9),
(6.76, '2025-09-15 10:00:00', 9),
(6.05, '2025-10-15 10:00:00', 9),
(7.72, '2025-11-15 10:00:00', 9),
(8.80, '2025-12-15 10:00:00', 9),
(7.15, '2026-01-15 10:00:00', 9),
(7.47, '2026-02-15 10:00:00', 9),
(9.21, '2026-03-15 10:00:00', 9),
(10.00, '2026-04-15 10:00:00', 9),
(8.03, '2026-05-15 10:00:00', 9);


---------------------------------------------------------------------------
----------------------------- KPIS E AVISOS -------------------------------
---------------------------------------------------------------------------

-- VIEW COM O TOTAL DE SILOS E VOLUME DELAS 
---------  GLOBAL -------------
CREATE VIEW vw_volume_silo AS
SELECT
    s.id AS id_silo,
    ROUND((3.1416 * s.raio * s.raio * (s.altura_total - t.distancia_superficie)),2) AS volume_atual,
    ROUND((3.1416 * s.raio * s.raio * s.altura_total) + ((1.0 / 3.0) * 3.1416 * s.raio * s.raio * s.altura_cone),2) AS volume_total
FROM
    silo s
    JOIN sensor se ON se.fk_silo = s.id
    JOIN telemetria t ON t.fk_sensor = se.id;
    
---------------------------------------------------------------------------
-------------- DASHBOARD INDIVIDUAL DE SILO -------------------------------
---------------------------------------------------------------------------

-- View total_silos + (data da última atualização)
CREATE VIEW vw_volume_total_silo AS
SELECT id AS id_silo, ROUND(
        (3.1416 * raio * raio * altura_total) + ((1.0 / 3.0) * 3.1416 * raio * raio * altura_cone), 2) AS volume_total
FROM silo;

-- Entrada e saída diária (Alterações gerais)
CREATE VIEW vw_entrada_saida_silo AS
SELECT
    s.id AS id_silo,
    t_atual.data_hora,
    ROUND(3.1416 * s.raio * s.raio * (s.altura_total - t_atual.distancia_superficie), 2) AS volume_atual,
    CASE
        WHEN (
            (3.1416 * s.raio * s.raio * (s.altura_total - t_atual.distancia_superficie)) - (3.1416 * s.raio * s.raio * (s.altura_total - t_anterior.distancia_superficie))
        ) > 0 THEN (3.1416 * s.raio * s.raio * (s.altura_total - t_atual.distancia_superficie)) - (3.1416 * s.raio * s.raio * (s.altura_total - t_anterior.distancia_superficie))
        ELSE 0
    END AS entrada_m3,
    CASE
        WHEN (
            (3.1416 * s.raio * s.raio * (s.altura_total - t_atual.distancia_superficie)) - (3.1416 * s.raio * s.raio * (s.altura_total - t_anterior.distancia_superficie))
        ) < 0 THEN (
            (3.1416 * s.raio * s.raio * (s.altura_total - t_anterior.distancia_superficie)) - (3.1416 * s.raio * s.raio * (s.altura_total - t_atual.distancia_superficie))
        ) ELSE 0
    END AS saida_m3
FROM
    silo s
    JOIN sensor se ON se.fk_silo = s.id
    JOIN telemetria t_atual ON t_atual.fk_sensor = se.id
    JOIN telemetria t_anterior ON t_anterior.id = t_atual.id - 1;
