class CreateAdminUsers < ActiveRecord::Migration
  
  def change
    create_table :admin_users do |t|
      t.string 'name'
      t.string 'username'
      t.string 'password_digest'
    end
  end
  
  def down
    drop_table :admin_users
  end
end
