INSERT INTO permissions (name, description, resource, created_at, updated_at) VALUES
  ('create_user', 'Permissão para criar usuários', 'users', NOW(), NOW()),
  ('update_user', 'Permissão para editar usuários', 'users', NOW(), NOW()),
  ('delete_user', 'Permissão para excluir usuários', 'users', NOW(), NOW()),
  ('view_user', 'Permissão para visualizar usuários', 'users', NOW(), NOW()),

  ('create_product', 'Permissão para criar produtos', 'products', NOW(), NOW()),
  ('update_product', 'Permissão para editar produtos', 'products', NOW(), NOW()),
  ('delete_product', 'Permissão para excluir produtos', 'products', NOW(), NOW()),
  ('view_product', 'Permissão para visualizar produtos', 'products', NOW(), NOW()),

  ('create_sale', 'Permissão para registrar vendas', 'sales', NOW(), NOW()),
  ('view_sale', 'Permissão para visualizar vendas', 'sales', NOW(), NOW()),

  ('create_purchase', 'Permissão para registrar compras', 'purchases', NOW(), NOW()),
  ('view_purchase', 'Permissão para visualizar compras', 'purchases', NOW(), NOW()),

  ('create_expense', 'Permissão para registrar despesas', 'expenses', NOW(), NOW()),
  ('view_expense', 'Permissão para visualizar despesas', 'expenses', NOW(), NOW());
