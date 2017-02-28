class AddTagToProjects < ActiveRecord::Migration
  
  def up
  	add_column "projects", "tag", :string, :default => ""
  end

  def down
  	remove_column "projects", "tag"
  end
  
end
