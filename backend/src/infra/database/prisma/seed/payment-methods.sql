INSERT INTO payment_methods (name, description, active, created_at, updated_at)
VALUES 
  ('Dinheiro', 'Pagamento em espécie', true, NOW(), NOW()),
  ('Pix', 'Transferência via Pix', true, NOW(), NOW()),
  ('Cartão de crédito', 'Pagamento no cartão de crédito', true, NOW(), NOW()),
  ('Cartão de débito', 'Pagamento no cartão de débito', true, NOW(), NOW());
