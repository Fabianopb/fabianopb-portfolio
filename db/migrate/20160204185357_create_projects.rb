class CreateProjects < ActiveRecord::Migration
  
  def up
    create_table :projects do |t|
      t.string "title"
      t.string "caption"
      t.text "abstract"
      t.text "text"
      t.text "facts"
    end
  end
  
  def down
    drop_table :projects
  end
  
end
