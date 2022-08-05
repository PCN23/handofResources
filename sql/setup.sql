-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS jerseys;
DROP TABLE IF EXISTS cereals;
DROP TABLE IF EXISTS glasses;

CREATE TABLE jerseys (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    country VARCHAR NOT NULL,
    league VARCHAR NOT NULL,
    cost BIGINT
);
CREATE TABLE cereals (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    maker VARCHAR NOT NULL,
    price BIGINT NOT NULL,
    size VARCHAR 
);
CREATE TABLE glasses (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    glassblower VARCHAR NOT NULL,
    gas_used VARCHAR NOT NULL,
    color VARCHAR NOT NULL
)
INSERT INTO glases ( name, glassblower, gas_used, color)
VALUES (
    'memorial glass',
    'Bob Meyer',
    'propane',
    'mixed'
),
(
    'lampwork',
    'Jim Aden',
    'propane',
    'baby blue'
),
(
    'floats',
    'Bob Meyer',
    'natural gas',
    'yellow'
);

INSERT INTO 
    cereals (name, maker, price, size)

VALUES
(
    'Carlos V',
    'Nestel',
    '18',
    'large'
),
(
    'ChocaPic',
    'Nestel',
    '25',
    'large'
),
(
    'Pelotitas',
    'Gonely',
    '36',
    'extra large'
),
(
    'kariot',
    'Telma',
    '14',
    'medium'
),
(
    'Krispy cream os',
    'kellog',
    '19',
    'small'
);
INSERT INTO 
    jerseys (name, country, league, cost)

VALUES
    (
        'Real Madrid FC',
        'Spain',
        'La Liga Santander',
        '105'
    ),
    (
        'Manchester United FC',
        'England',
        'Barclays English Preimer Leauge',
        '90'
    ),
    (
        'Juventus CF',
        'Italy',
        'Seria A',
        '93'
    ),
    (
        'PSG',
        'France',
        'League un',
        '85'
    ),
    (
        'Timbers',
        'USA',
        'MLS',
        '500'
    );
