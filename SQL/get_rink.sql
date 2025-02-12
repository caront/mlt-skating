DROP function IF EXISTS get_rink(INTEGER);

CREATE OR REPLACE FUNCTION get_rink(
    rink_id INTEGER
) RETURNS TABLE (
    id INTEGER,
    district_id INTEGER,
    name TEXT,
    description TEXT,
    type TEXT,
    rink_name TEXT,
    latitude FLOAT,
    longitude FLOAT,
    updated_at TIMESTAMP,
    public_static_map_url TEXT,
    schedules JSONB,
    services TEXT[],
    information TEXT,
    address TEXT,
    description_fr TEXT,
    description_en TEXT,
    name_fr TEXT,
    name_en TEXT,
    information_fr TEXT,
    information_en TEXT,
    is_active BOOLEAN,
    district JSONB,
    conditions_history JSONB,
    last_open_true TIMESTAMP,
    last_cleared_true TIMESTAMP,
    last_watered_true TIMESTAMP,
    last_resurfaced_true TIMESTAMP
) 
LANGUAGE SQL AS $$ 
WITH RINKS AS (
    SELECT
        r.id,
        r.district_id,
        r.name,
        r.description,
        r.type,
        r.rink_name,
        r.latitude,
        r.longitude,
        r.updated_at,
        r.public_static_map_url,
        r.schedules,
        r.services,
        r.information,
        r.address,
        r.description_fr,
        r.description_en,
        r.name_fr,
        r.name_en,
        r.information_fr,
        r.information_en,
        r.is_active,
        d.name AS district_name
    FROM public.rinks r
    INNER JOIN public.districts d ON d.id = r.district_id
    WHERE r.id = rink_id
),
RINK_CONDITION AS (
    -- Get all conditions for the rink in an array (limited to the last 15)
    SELECT
        conditions.rink_id,
        jsonb_agg(
            jsonb_build_object(
                'id', conditions.id,
                'updated_at', conditions.updated_at,
                'open', conditions.open,
                'ice_quality', conditions.condition,
                'cleared', conditions.cleared,
                'watered', conditions.watered,
                'resurfaced', conditions.resurfaced
            ) ORDER BY conditions.updated_at DESC
        ) AS conditions_history
    FROM public.conditions
    WHERE conditions.rink_id = rink_id
    GROUP BY conditions.rink_id
    ORDER BY MAX(conditions.updated_at) DESC -- Ensure latest records are fetched first
), 
LAST_TRUE_TIMES AS (
    -- Find the last time each condition was true
    SELECT
        rink_id,
        MAX(CASE WHEN open THEN updated_at END) AS last_open_true,
        MAX(CASE WHEN cleared THEN updated_at END) AS last_cleared_true,
        MAX(CASE WHEN watered THEN updated_at END) AS last_watered_true,
        MAX(CASE WHEN resurfaced THEN updated_at END) AS last_resurfaced_true
    FROM public.conditions
    WHERE rink_id = rink_id
    GROUP BY rink_id
)
SELECT
    r.id,
    r.district_id,
    r.name,
    r.description,
    r.type,
    r.rink_name,
    r.latitude,
    r.longitude,
    r.updated_at,
    r.public_static_map_url,
    r.schedules,
    r.services,
    r.information,
    r.address,
    r.description_fr,
    r.description_en,
    r.name_fr,
    r.name_en,
    r.information_fr,
    r.information_en,
    r.is_active,
    jsonb_build_object(
        'id', r.district_id,
        'name', r.district_name
    ) AS district,
    rc.conditions_history,
    ltt.last_open_true,
    ltt.last_cleared_true,
    ltt.last_watered_true,
    ltt.last_resurfaced_true
FROM RINKS r
LEFT JOIN RINK_CONDITION rc ON r.id = rc.rink_id
LEFT JOIN LAST_TRUE_TIMES ltt ON r.id = ltt.rink_id;
$$;

-- Grant execution rights to anonymous and authenticated users
GRANT EXECUTE ON FUNCTION public.get_rink TO anon, authenticated;


-- select * from get_rink(1117);
