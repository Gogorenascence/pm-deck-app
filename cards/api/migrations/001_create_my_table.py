steps = [
    [
        """
        CREATE TABLE card_types (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(200) NOT NULL,
            deck_type VARCHAR(100) NOT NULL
            rules TEXT(200),
        );
        """,
        """
        DROP TABLE card_types;
        """,
    ],
    [
        """
        CREATE TABLE extra_effects (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(200) NOT NULL,
            rules TEXT(200),
        );
        """,
        """
        DROP TABLE extra_effects;
        """,
    ],
    [
        """
        CREATE TABLE reactions (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(200) NOT NULL,
            rules TEXT(200),
        );
        """,
        """
        DROP TABLE reactions;
        """,
    ],
    [
        """
        CREATE TABLE tags (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(200) NOT NULL,
            rules TEXT(200),
        );
        """,
        """
        DROP TABLE tags;
        """,
    ],
    # [
    #     """
    #     CREATE TABLE cards(
    #         id SERIAL PRIMARY KEY NOT NULL,
    #         name VARCHAR(200) NOT NULL,
    #         card_class VARCHAR(200) NOT NULL,
    #         hero_name VARCHAR(200) NOT NULL,
    #         hero_id VARCHAR(200) NOT NULL,
    #         series_name VARCHAR(200) NOT NULL,
    #         card_number INTEGER NOT NULL,
    #         effect_text TEXT,
    #         flavor_text TEXT,
    #         illustrator VARCHAR(200),
    #         picture_url VARCHAR(2000),
    #         file_name VARCHAR(200) NOT NULL
    #     )
    #     """,
    #     """
    #     DROP TABLE cards;
    #     """,
    # ],
    # [
    #     """
    #     CREATE TABLE card_typed (
    #         name VARCHAR(200) NOT NULL,
    #         rules TEXT(200),
    #     );
    #     """,
    #     """
    #     DROP TABLE card_typed;
    #     """,
    # ],
    # [
    #     """
    #     CREATE TABLE extra_effected (
    #         id SERIAL PRIMARY KEY NOT NULL,
    #         name VARCHAR(200) NOT NULL,
    #         rules TEXT(200),
    #     );
    #     """,
    #     """
    #     DROP TABLE extra_effected;
    #     """,
    # ],
    # [
    #     """
    #     CREATE TABLE reactioned (
    #         id SERIAL PRIMARY KEY NOT NULL,
    #         name VARCHAR(200) NOT NULL,
    #         rules TEXT(200),
    #     );
    #     """,
    #     """
    #     DROP TABLE reactioned;
    #     """,
    # ],
]
