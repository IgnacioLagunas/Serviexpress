-- Insertar usuarios (Clientes)
INSERT INTO usuarios (email, nombre, apellido, password, rol)
VALUES (
        'cliente1@example.com',
        'Juan',
        'Pérez',
        '1234',
        'Cliente'
    ),
    (
        'cliente2@example.com',
        'María',
        'González',
        '1234',
        'Cliente'
    ),
    (
        'cliente3@example.com',
        'Carlos',
        'López',
        '1234',
        'Cliente'
    );
-- Insertar usuario (Administrador)
INSERT INTO usuarios (email, nombre, apellido, password, rol)
VALUES (
        'admin@example.com',
        'Ana',
        'Martínez',
        '1234',
        'Administrador'
    );
-- Insertar usuarios (Empleados)
INSERT INTO usuarios (email, nombre, apellido, password, rol)
VALUES (
        'empleado1@example.com',
        'Luis',
        'Rodríguez',
        '1234',
        'Empleado'
    ),
    (
        'empleado2@example.com',
        'Sofía',
        'Ramírez',
        '1234',
        'Empleado'
    );
--@block
INSERT INTO servicios (descripcion, precio, img)
VALUES ('Cambio de aceite', 50000, NULL),
    ('Chequeo general', 70000, NULL),
    ('Cambio de neumáticos', 120000, NULL),
    ('Alineación', 40000, NULL),
    ('Balanceo', 35000, NULL),
    ('Revisión de frenos', 60000, NULL),
    ('Cambio de batería', 100000, NULL),
    ('Reparación de motor', 500000, NULL);