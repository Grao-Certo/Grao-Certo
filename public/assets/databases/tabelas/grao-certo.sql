CREATE DATABASE graoCerto;

USE graoCerto;

CREATE TABLE
    empresa (
        id INT PRIMARY KEY AUTO_INCREMENT,
        tipo_pessoa CHAR(2),
        documento VARCHAR(18) UNIQUE,
        nome VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        telefone VARCHAR(11),
        cep CHAR(8),
        quantidade_silos INT,
        CONSTRAINT chk_tipo_pessoa_empresa CHECK (tipo_pessoa IN ('PF', 'PJ'))
    );

CREATE TABLE
    usuario (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(100),
        senha CHAR(60),
        email VARCHAR(100) UNIQUE,
        fk_empresa INT,
        FOREIGN KEY (fk_empresa) REFERENCES empresa (id)
    );

CREATE TABLE
    silo (
        id INT PRIMARY KEY AUTO_INCREMENT,
        tipo_silo VARCHAR(30),
        altura_total DECIMAL(5, 2),
        comprimento DECIMAL(5, 2),
        largura DECIMAL(5, 2),
        raio DECIMAL(5, 2),
        altura_cone DECIMAL(5, 2),
        volume_maximo DECIMAL(10, 2),
        fk_empresa INT,
        CONSTRAINT chk_tipo_silo CHECK (
            tipo_silo IN (
                'Trincheira',
                'Cilíndrico',
                'Cilíndrico com Teto Cônico'
            )
        ),
        FOREIGN KEY (fk_empresa) REFERENCES empresa (id)
    );

CREATE TABLE
    sensor (
        id INT PRIMARY KEY AUTO_INCREMENT,
        identificacao VARCHAR(45) UNIQUE,
        status_sensor VARCHAR(20),
        data_instalacao DATE,
        fk_silo INT,
        CONSTRAINT chk_status_sensor_sensor CHECK (
            status_sensor IN ('ativo', 'inativo', 'manutencao', 'instalacao')
        ),
        FOREIGN KEY (fk_silo) REFERENCES silo (id)
    );

CREATE TABLE
    telemetria (
        id INT PRIMARY KEY AUTO_INCREMENT,
        distancia_superficie DECIMAL(5, 2),
        data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
        fk_silo INT,
        fk_sensor INT,
        FOREIGN KEY (fk_silo) REFERENCES silo (id),
        FOREIGN KEY (fk_sensor) REFERENCES sensor (id)
    );

CREATE TABLE
    historico_estoque (
        id INT PRIMARY KEY AUTO_INCREMENT,
        fk_silo INT,
        volume_anterior DECIMAL(10, 2),
        volume_novo DECIMAL(10, 2),
        diferenca DECIMAL(10, 2),
        data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (fk_silo) REFERENCES silo (id)
    );

INSERT INTO
    empresa (
        tipo_pessoa,
        documento,
        nome,
        email,
        telefone,
        cep,
        quantidade_silos
    )
VALUES
    (
        'PF',
        '38472961502',
        'Rafael Moura',
        'rafael.moura@email.com',
        NULL,
        '04567010',
        1
    ),
    (
        'PF',
        '52917483641',
        'Lucas Silvestre',
        'lucas.silvestre@email.com',
        NULL,
        '03312040',
        1
    ),
    (
        'PF',
        '94726153088',
        'Maria Eduarda Almeida',
        'maria.almeida@email.com',
        NULL,
        '01311000',
        1
    ),
    (
        'PJ',
        '37482916000152',
        'Agro Silo Brasil LTDA',
        'contato@agrosilo.com',
        '11987654321',
        '06789030',
        1
    ),
    (
        'PJ',
        '60391827000144',
        'Armazens Paulistas SA',
        'contato@armazenspaulistas.com',
        '11987654322',
        '07215060',
        2
    );

INSERT INTO
    usuario (nome, senha, email, fk_empresa)
VALUES
    (
        'Rafael Moura',
        '$2a$12$OcsHzgfrcH.yOLtdMOr5f.4NOCoJGYCM8gEfDPFsNegdYly3wA1Gm',
        'rafael.moura@email.com',
        1
    ),
    (
        'Lucas Silvestre',
        '$2a$12$OcsHzgfrcH.yOLtdMOr5f.4NOCoJGYCM8gEfDPFsNegdYly3wA1Gm',
        'lucas.silvestre@email.com',
        2
    ),
    (
        'Maria Eduarda Almeida',
        '$2a$12$OcsHzgfrcH.yOLtdMOr5f.4NOCoJGYCM8gEfDPFsNegdYly3wA1Gm',
        'maria.almeida@email.com',
        3
    ),
    (
        'Agro Silo Brasil LTDA',
        '$2a$12$OcsHzgfrcH.yOLtdMOr5f.4NOCoJGYCM8gEfDPFsNegdYly3wA1Gm',
        'contato@agrosilo.com',
        4
    ),
    (
        'Armazens Paulistas SA',
        '$2a$12$OcsHzgfrcH.yOLtdMOr5f.4NOCoJGYCM8gEfDPFsNegdYly3wA1Gm',
        'contato@armazenspaulistas.com',
        5
    );

INSERT INTO
    silo (
        tipo_silo,
        altura_total,
        comprimento,
        largura,
        raio,
        altura_cone,
        volume_maximo,
        fk_empresa
    )
VALUES
    (
        'Trincheira',
        4.50,
        30.00,
        12.00,
        NULL,
        NULL,
        1620.00,
        1
    ),
    (
        'Cilíndrico',
        12.00,
        NULL,
        NULL,
        4.00,
        NULL,
        603.19,
        2
    ),
    (
        'Cilíndrico',
        14.00,
        NULL,
        NULL,
        4.50,
        NULL,
        890.12,
        3
    ),
    (
        'Cilíndrico com Teto Cônico',
        20.00,
        NULL,
        NULL,
        6.50,
        4.00,
        2299.33,
        4
    ),
    (
        'Trincheira',
        5.00,
        40.00,
        14.00,
        NULL,
        NULL,
        2800.00,
        5
    ),
    (
        'Cilíndrico',
        18.00,
        NULL,
        NULL,
        5.50,
        NULL,
        1710.42,
        5
    );

INSERT INTO
    sensor (
        identificacao,
        status_sensor,
        data_instalacao,
        fk_silo
    )
VALUES
    ('SENSOR_01', 'ativo', '2023-02-10', 1),
    ('SENSOR_02', 'ativo', '2022-08-15', 2),
    ('SENSOR_03', 'ativo', '2024-01-05', 3),
    ('SENSOR_04', 'manutencao', '2021-06-20', 4),
    ('SENSOR_05', 'ativo', '2020-03-11', 5),
    ('SENSOR_06', 'ativo', '2023-09-30', 6);


INSERT INTO
    historico_estoque (fk_silo, volume_anterior, volume_novo, diferenca)
SELECT
    fk_silo,
    volume_estimado,
    900.00,
    900.00 - volume_estimado
FROM
    telemetria
WHERE
    id = 1;

UPDATE telemetria
SET
    volume_estimado = 900.00
WHERE
    id = 1;

SELECT
    *
FROM
    empresa
ORDER BY
    nome;

SELECT
    e.nome AS nome_da_empresa,
    u.nome AS nome_do_usuario,
    u.email AS email_do_usuario
FROM
    empresa e
    JOIN usuario u ON u.fk_empresa = e.id
ORDER BY
    e.nome;

SELECT
    e.nome AS nome_empresa,
    s.id AS id_do_silo,
    s.tipo_silo,
    s.volume_maximo,
    t.volume_estimado,
    t.data_hora
FROM
    silo s
    JOIN empresa e ON s.fk_empresa = e.id
    JOIN telemetria t ON t.fk_silo = s.id
ORDER BY
    t.data_hora DESC;

SELECT
    h.data_hora,
    h.volume_anterior,
    h.volume_novo,
    h.diferenca,
    s.tipo_silo
FROM
    historico_estoque h
    JOIN silo s ON h.fk_silo = s.id
WHERE
    h.fk_silo = 1
ORDER BY
    h.data_hora DESC;

SELECT
    e.nome AS nome_empresa,
    s.identificacao,
    s.status_sensor,
    s.data_instalacao
FROM
    sensor s
    JOIN silo si ON s.fk_silo = si.id
    JOIN empresa e ON si.fk_empresa = e.id
ORDER BY
    e.nome,
    s.status_sensor;

SELECT
    e.nome AS nome_empresa,
    s.id AS id_silo,
    s.tipo_silo,
    t.volume_estimado,
    s.volume_maximo,
    (t.volume_estimado / s.volume_maximo) * 100 AS percentual_ocupacao
FROM
    silo s
    JOIN empresa e ON s.fk_empresa = e.id
    JOIN telemetria t ON t.fk_silo = s.id
ORDER BY
    t.data_hora DESC;