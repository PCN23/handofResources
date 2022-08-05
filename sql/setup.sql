-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS jerseys;
DROP TABLE IF EXISTS cereals;

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
    price BIGINT,
    size VARCHAR NOT NULL
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
