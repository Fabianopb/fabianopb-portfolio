class AddImagesToProjects < ActiveRecord::Migration
  
  def up
    add_column("projects", "image1", :string, :after => "facts")
    add_column("projects", "image2", :string, :after => "image1")
  end
  
  def down
    remove_column("projects", "image1")
    remove_column("projects", "image2")
  end
  
end
