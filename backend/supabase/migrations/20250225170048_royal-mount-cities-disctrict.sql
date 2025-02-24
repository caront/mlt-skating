--up

insert into
    TABLE cities (name, longitude, latitude)
values
    ('Royal Mount', 45.501437, -73.616822);

insert into
    TABLE districts (name, city_id, code, longitude, latitude)
values
    ('Royal Mount', 2, "rm", 45.501437, -73.616822);