DROP FUNCTION IF EXISTS rink_around(INTEGER, distance FLOAT);

CREATE OR REPLACE FUNCTION rink_around(rinkid INTEGER, distance FLOAT) RETURNS TABLE (
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
    conditions JSONB,
    distance FLOAT
) LANGUAGE SQL AS 
$$
WITH target_rink AS (
    SELECT location
    FROM public.rinks
    WHERE id = rinkid
)
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
                'open', conditions.open,
                'ice_quality', conditions.condition,
                'cleared', conditions.cleared,
                'watered', conditions.watered,
                'resurfaced', conditions.resurfaced,
                'updated_at', conditions.updated_at
            )
        FROM
            public.conditions
        WHERE
            public.conditions.rink_id = r.id
        ORDER BY
            conditions.updated_at DESC
        LIMIT 1
    ) AS conditions,
    ST_Distance(r.location, t.location) AS distance
FROM
    public.rinks r,
    target_rink t
WHERE
    r.id != rinkid
    AND ST_DWithin(r.location, t.location, distance)
    and r.is_active = true
ORDER BY
    distance
$$;

GRANT EXECUTE ON FUNCTION public.rink_around TO anon, authenticated;


select * from public.rink_around(1044, 5000);