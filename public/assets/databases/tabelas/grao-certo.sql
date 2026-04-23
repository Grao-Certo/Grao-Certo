CREATE DATABASE graoCerto;

USE graoCerto;

CREATE TABLE
    empresa (
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
        email VARCHAR(100) UNIQUE NOT NULL,
        senha CHAR(60) NOT NULL,
        tipo_usuario VARCHAR(20) NOT NULL,
        fk_empresa INT NOT NULL,
        CONSTRAINT chk_tipo_usuario CHECK (tipo_usuario IN ('administrador', 'operador')),
        FOREIGN KEY (fk_empresa) REFERENCES empresa (id)
    );

CREATE TABLE
    telefone (
        id INT PRIMARY KEY AUTO_INCREMENT,
        numero VARCHAR(11) NOT NULL,
        tipo VARCHAR(20) NOT NULL,
        fk_empresa INT,
        fk_usuario INT,
        CONSTRAINT chk_tipo_telefone CHECK (tipo IN ('empresa', 'pessoal')),
        FOREIGN KEY (fk_empresa) REFERENCES empresa (id),
        FOREIGN KEY (fk_usuario) REFERENCES usuario (id)
    );

CREATE TABLE
    silo (
        id INT PRIMARY KEY AUTO_INCREMENT,
        tipo_silo VARCHAR(40) NOT NULL,
        altura_total DECIMAL(5, 2) NOT NULL,
        comprimento DECIMAL(5, 2),
        largura DECIMAL(5, 2),
        raio DECIMAL(5, 2),
        altura_cone DECIMAL(5, 2),
        fk_empresa INT NOT NULL,
        CONSTRAINT chk_tipo_silo CHECK (
            tipo_silo IN (
                'Trincheira',
                'Cilindrico',
                'Cilindrico com Teto Conico'
            )
        ),
        FOREIGN KEY (fk_empresa) REFERENCES empresa (id)
    );

CREATE TABLE
    sensor (
        id INT PRIMARY KEY AUTO_INCREMENT,
        identificacao VARCHAR(45) UNIQUE NOT NULL,
        status_sensor VARCHAR(20) NOT NULL,
        data_instalacao DATE,
        fk_silo INT NOT NULL,
        CONSTRAINT chk_status_sensor CHECK (
            status_sensor IN ('ativo', 'inativo', 'manutencao', 'instalacao')
        ),
        FOREIGN KEY (fk_silo) REFERENCES silo (id)
    );

CREATE TABLE
    telemetria (
        id INT PRIMARY KEY AUTO_INCREMENT,
        distancia_superficie DECIMAL(5, 2) NOT NULL,
        data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
        fk_sensor INT NOT NULL,
        FOREIGN KEY (fk_sensor) REFERENCES sensor (id)
    );

CREATE TABLE
    historico_estoque (
        id INT PRIMARY KEY AUTO_INCREMENT,
        fk_silo INT NOT NULL,
        volume_anterior DECIMAL(10, 2),
        volume_novo DECIMAL(10, 2),
        data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (fk_silo) REFERENCES silo (id)
    );

INSERT INTO
    empresa (
        nome,
        cnpj,
        email,
        cep,
        numero_endereco,
        complemento_endereco
    )
VALUES
    (
        'AgroTech Soluções',
        '12345678000101',
        'contato@agrotech.com',
        '04567010',
        '120',
        'Galpão A'
    ),
    (
        'Silos Brasil LTDA',
        '98765432000199',
        'financeiro@silosbrasil.com',
        '03312040',
        '450',
        NULL
    ),
    (
        'Armazéns do Campo',
        '11223344000155',
        'suporte@armazens.com',
        '06789030',
        '78',
        'Bloco 2'
    );

INSERT INTO
    usuario (nome, email, senha, tipo_usuario, fk_empresa)
VALUES
    (
        'Carlos Mendes',
        'carlos@agrotech.com',
        '$2a$12$hashfake1',
        'administrador',
        1
    ),
    (
        'Ana Souza',
        'ana@agrotech.com',
        '$2a$12$hashfake2',
        'operador',
        1
    ),
    (
        'Bruno Lima',
        'bruno@silosbrasil.com',
        '$2a$12$hashfake3',
        'administrador',
        2
    ),
    (
        'Fernanda Alves',
        'fernanda@armazens.com',
        '$2a$12$hashfake4',
        'operador',
        3
    );

INSERT INTO
    telefone (numero, tipo, fk_empresa, fk_usuario)
VALUES
    ('11987654321', 'empresa', 1, NULL),
    ('11911112222', 'pessoal', NULL, 1),
    ('11933334444', 'pessoal', NULL, 2),
    ('11955556666', 'empresa', 2, NULL),
    ('11977778888', 'empresa', 3, NULL),
    ('11999990000', 'pessoal', NULL, 4);

INSERT INTO
    silo (
        tipo_silo,
        altura_total,
        comprimento,
        largura,
        raio,
        altura_cone,
        fk_empresa
    )
VALUES
    ('Trincheira', 4.50, 30.00, 12.00, NULL, NULL, 1),
    ('Cilindrico', 12.00, NULL, NULL, 4.00, NULL, 1),
    (
        'Cilindrico com Teto Conico',
        18.00,
        NULL,
        NULL,
        5.50,
        3.00,
        2
    ),
    ('Trincheira', 5.00, 40.00, 14.00, NULL, NULL, 3);

INSERT INTO
    sensor (
        identificacao,
        status_sensor,
        data_instalacao,
        fk_silo
    )
VALUES
    ('SENSOR_001', 'ativo', '2024-01-10', 1),
    ('SENSOR_002', 'ativo', '2024-02-15', 2),
    ('SENSOR_003', 'manutencao', '2023-11-20', 3),
    ('SENSOR_004', 'ativo', '2024-03-05', 4);

INSERT INTO
    historico_estoque (fk_silo, volume_anterior, volume_novo)
VALUES
    (1, 1200.00, 1350.00),
    (1, 1350.00, 1100.00),
    (2, 500.00, 650.00),
    (3, 900.00, 1200.00),
    (4, 2000.00, 1800.00);

SELECT
    *
FROM
    empresa
ORDER BY
    nome;

-- Seleciona a empresa e seu respectivo silo
SELECT
    e.nome AS empresa,
    s.id AS silo,
    s.tipo_silo,
    s.altura_total
FROM
    empresa e
    JOIN silo s ON s.fk_empresa = e.id
ORDER BY
    e.nome;

-- Exibe a qual empresa um usuario pertence e qual o cargo do usuario
SELECT
    e.nome AS empresa,
    u.nome AS usuario,
    u.tipo_usuario
FROM
    usuario u
    JOIN empresa e ON u.fk_empresa = e.id
ORDER BY
    e.nome;

-- Exibir telefones e seus respectivos donos
SELECT
    t.numero,
    t.tipo,
    e.nome AS empresa,
    u.nome AS usuario
FROM
    telefone t
    LEFT JOIN empresa e ON t.fk_empresa = e.id
    LEFT JOIN usuario u ON t.fk_usuario = u.id
ORDER BY
    t.tipo;

-- Select que mostra todos os sensores com ordenados pelo status
SELECT
    se.identificacao,
    se.status_sensor,
    se.data_instalacao,
    s.id AS silo,
    e.nome AS empresa
FROM
    sensor se
    JOIN silo s ON se.fk_silo = s.id
    JOIN empresa e ON s.fk_empresa = e.id
ORDER BY
    se.status_sensor;

-- SELECT completo com informações do sensor, telemetria, qual o silo e a qual empresa pertence
SELECT
    e.nome AS empresa,
    s.id AS silo,
    se.identificacao AS sensor,
    t.distancia_superficie,
    t.data_hora
FROM
    telemetria t
    JOIN sensor se ON t.fk_sensor = se.id
    JOIN silo s ON se.fk_silo = s.id
    JOIN empresa e ON s.fk_empresa = e.id
ORDER BY
    t.data_hora DESC;

-- SELECT dos sensores que precisão de manutencao
SELECT
    e.nome AS empresa,
    s.id AS silo,
    se.identificacao,
    se.status_sensor
FROM
    sensor se
    JOIN silo s ON se.fk_silo = s.id
    JOIN empresa e ON s.fk_empresa = e.id
WHERE
    se.status_sensor = 'manutencao';

-- SELECT com histórico de movimentação do historico_estoque
SELECT
    e.nome AS empresa,
    s.id AS silo,
    h.volume_anterior,
    h.volume_novo,
    (h.volume_novo - h.volume_anterior) AS variacao,
    h.data_hora
FROM
    historico_estoque h
    JOIN silo s ON h.fk_silo = s.id
    JOIN empresa e ON s.fk_empresa = e.id
ORDER BY
    h.data_hora DESC;