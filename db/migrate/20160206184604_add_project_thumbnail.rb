class AddProjectThumbnail < ActiveRecord::Migration
  
  def change
    add_column("projects", "thumbnail", :string, :after => "image2")
  end
  
  def down
    remove_column("projects", "thumbnail")
  end
  
end
