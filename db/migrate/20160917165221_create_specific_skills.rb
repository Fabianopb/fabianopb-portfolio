class CreateSpecificSkills < ActiveRecord::Migration
  def change
    create_table :specific_skills do |t|
    	t.string :category
    	t.string :name
    	t.integer :size
      t.timestamps null: false
    end
  end
end
