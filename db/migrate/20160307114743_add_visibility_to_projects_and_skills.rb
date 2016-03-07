class AddVisibilityToProjectsAndSkills < ActiveRecord::Migration
  
  def up
      add_column "projects", "visibility", :boolean, :default => false
      add_column "skills", "visibility", :boolean, :default => false
  end
  
  def down
    remove_column "projects", "visibility"
    remove_column "skills", "visibility"
  end
  
end
