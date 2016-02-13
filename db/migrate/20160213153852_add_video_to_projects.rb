class AddVideoToProjects < ActiveRecord::Migration
  
  def up
    add_column("projects", "video", :string, :after => "thumbnail")
  end
  
  def down
    remove_column("projects", "video")
  end
  
end
