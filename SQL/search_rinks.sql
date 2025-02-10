CREATE OR REPLACE FUNCTION search_rinks(
    q TEXT,
    latitude_search DOUBLE PRECISION,
    longitude_search DOUBLE PRECISION
) RETURNS TABLE (
    id INTEGER,
    name TEXT,
    distance FLOAT,
    rink_type TEXT,
    description TEXT,
    description_fr TEXT,
    description_en TEXT,
    rink_name TEXT,
    longitude FLOAT,
    latitude FLOAT,
    district_name TEXT,
    conditions JSONB,
    last_update TIMESTAMP
) 
LANGUAGE SQL AS $$ 
WITH RINK_DISTANCE AS (
    SELECT
        rinks.id,
        rinks.name,
        rinks.type AS rink_type,
        rinks.description,
        rinks.description_fr,
        rinks.description_en,
        rinks.rink_name,
        rinks.longitude,
        rinks.latitude,
        d.name AS district_name,
        ST_Distance(
            rinks.location,
            ST_SetSRID(ST_MakePoint(longitude_search, latitude_search), 4326)
        ) AS distance
    FROM public.rinks
    INNER JOIN public.districts d ON d.id = rinks.district_id
    WHERE 
        rinks.is_active = TRUE
        AND rinks.name ILIKE CONCAT('%', q, '%') -- Corrected search filter
),
RINK_CONDITION AS (
    SELECT DISTINCT ON (conditions.rink_id) 
        conditions.rink_id,
        conditions.updated_at,
        jsonb_build_object(
            'open', conditions.open,
            'ice_condition', conditions.condition,
            'cleared', conditions.cleared,
            'watered', conditions.watered,
            'resurfaced', conditions.resurfaced
        ) AS conditions
    FROM public.conditions
    ORDER BY conditions.rink_id, conditions.updated_at DESC
)
SELECT
    rd.id,
    rd.name,
    rd.distance,
    rd.rink_type,
    rd.description,
    rd.description_fr,
    rd.description_en,
    rd.rink_name,
    rd.longitude,
    rd.latitude,
    rd.district_name,
    rc.conditions,
    rc.updated_at AS "updatedAt"
FROM RINK_DISTANCE rd
    LEFT JOIN RINK_CONDITION rc ON rd.id = rc.rink_id
ORDER BY distance;
$$;

GRANT EXECUTE ON FUNCTION public.search_rinks TO anon, authenticated;