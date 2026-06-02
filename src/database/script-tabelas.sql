-- Active: 1779726796255@@127.0.0.1@3307@graoCerto
CREATE DATABASE graoCerto;

DROP DATABASE graoCerto;

USE graoCerto;

CREATE TABLE empresa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cnpj CHAR(14) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE,
    cep CHAR(8),
    numero_endereco VARCHAR(5),
    complemento_endereco VARCHAR(60)
);

CREATE TABLE
    usuario (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(100) NOT NULL,
        cpf CHAR(11) NOT NULL UNIQUE,
        email VARCHAR(100) UNIQUE NOT NULL,
        senha CHAR(60) NOT NULL,
        tipo_usuario VARCHAR(20) NOT NULL,
        fk_empresa INT NOT NULL,
        CONSTRAINT chk_tipo_usuario CHECK (tipo_usuario IN ('administrador', 'operador', 'suporte')),
        FOREIGN KEY (fk_empresa) REFERENCES empresa (id)
    );

ALTER TABLE usuario DROP CONSTRAINT chk_tipo_usuario;
ALTER TABLE usuario ADD CONSTRAINT chk_tipo_usuario CHECK (tipo_usuario IN ('administrador', 'operador', 'suporte'));

CREATE TABLE telefone (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero VARCHAR(11) NOT NULL,
    tipo VARCHAR(20) NOT NULL,
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
    altura_total DECIMAL(5, 2) NOT NULL,
    comprimento DECIMAL(5, 2),
    largura DECIMAL(5, 2),
    raio DECIMAL(5, 2),
    altura_cone DECIMAL(5, 2),
    fk_empresa INT NOT NULL,
    FOREIGN KEY (fk_empresa) REFERENCES empresa (id)
);

CREATE TABLE sensor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    status_sensor VARCHAR(20) NOT NULL,
    data_instalacao DATE,
    fk_silo INT NOT NULL,
    CONSTRAINT chk_status_sensor CHECK (
        status_sensor IN ('ativo','inativo','manutencao','instalacao')
    ),
    FOREIGN KEY (fk_silo) REFERENCES silo (id)
);

CREATE TABLE telemetria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    distancia_superficie DECIMAL(5, 2) NOT NULL,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_sensor INT NOT NULL,
    FOREIGN KEY (fk_sensor) REFERENCES sensor (id)
);

INSERT INTO empresa (nome, cnpj, email, cep, numero_endereco, complemento_endereco) VALUES
('AgroTech Soluções','12345678000101','contato@agrotech.com','04567010','120','Galpão A'),
('Silos Brasil LTDA','98765432000199','financeiro@silosbrasil.com','03312040','450',NULL),
('Armazéns do Campo','11223344000155','suporte@armazens.com','06789030','78','Bloco 2');

INSERT INTO usuario (nome, email, senha, tipo_usuario, cpf, fk_empresa) VALUES 
('Carlos Mendes','carlos@agrotech.com','$2a$12$hashfake','administrador','41231234123',1),
('Ana Souza','ana@agrotech.com','$2a$12$hashfake2','operador','23412312341',1),
('Bruno Lima','bruno@silosbrasil.com','$2a$12$hashfake3','administrador','11231231231',2),
('Fernanda Alves','fernanda@armazens.com','$2a$12$hashfake4','operador','13123123123',3);

INSERT INTO telefone (numero, tipo, fk_empresa, fk_usuario) VALUES 
('11987654321', 'empresa', 1, NULL),
('11911112222', 'pessoal', NULL, 1),
('11933334444', 'pessoal', NULL, 2),
('11955556666', 'empresa', 2, NULL),
('11977778888', 'empresa', 3, NULL),
('11999990000', 'pessoal', NULL, 4);

INSERT INTO silo ( raio, altura_cone, altura_total, largura, fk_empresa ) VALUES 
(4.00, 2.00, 12.00, 8.00, 1);

INSERT INTO sensor ( status_sensor, data_instalacao, fk_silo ) VALUES 
('ativo', '2024-01-10', 1);

INSERT INTO silo (altura_total, comprimento, largura, raio, altura_cone, fk_empresa) VALUES
(15.00, 6.00, 6.00, 6.00, 4.00, 3),
(12.00, 5.00, 5.00, 5.00, 3.00, 3),
(10.00, 4.00, 4.00, 4.00, 2.00, 3);

INSERT INTO usuario (nome, email, senha, tipo_usuario, cpf, fk_empresa) VALUES
('Roberto Santos', 'roberto@armazens.com', '$2a$12$hashfake5', 'administrador', '34567890123', 3);

INSERT INTO sensor (status_sensor, data_instalacao, fk_silo) VALUES
('ativo', '2024-06-02', 1),
('ativo', '2025-14-12', 2),
('ativo', '2026-06-01', 3),
('ativo', '2024-09-13', 4),
('ativo', '2025-7-04', 5),
('ativo', '2026-03-12', 6),
('ativo', '2025-11-12', 7),
('ativo', '2026-02-05', 8),
('ativo', '2026-06-02', 9);


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
