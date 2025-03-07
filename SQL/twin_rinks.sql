DROP function IF EXISTS twin_rinks(INTEGER);

CREATE
OR REPLACE FUNCTION twin_rinks(rinkid INTEGER) RETURNS TABLE (
    id INTEGER,
    name TEXT,
    description TEXT,
    type TEXT,
    rink_name TEXT,
    information TEXT,
    description_fr TEXT,
    description_en TEXT,
    information_fr TEXT,
    information_en TEXT,
    conditions JSONB
) LANGUAGE SQL AS 
$$
SELECT
    r.id,
    r.name,
    r.description,
    r.type,
    r.rink_name,
    r.information,
    r.description_fr,
    r.description_en,
    r.information_fr,
    r.information_en,
    (
        SELECT
            jsonb_build_object(
                'open',
                conditions.open,
                'ice_quality',
                conditions.condition,
                'cleared',
                conditions.cleared,
                'watered',
                conditions.watered,
                'resurfaced',
                conditions.resurfaced,
                'updated_at',
                conditions.updated_at
            )
        FROM
            public.conditions
        WHERE
            public.conditions.rink_id = r.id
        ORDER BY
            conditions.updated_at DESC
        LIMIT
            1
    ) as conditions
FROM
    rink_group_rink rgr1
    INNER JOIN rink_group_rink rgr2 ON rgr2.rink_group_id = rgr1.rink_group_id
    INNER JOIN rinks r ON r.id = rgr2.rink_id
WHERE
    rgr1.rink_id = rinkid
    AND rgr2.rink_id != rinkid
$$;

GRANT EXECUTE ON FUNCTION public.twin_rinks TO anon,
authenticated;