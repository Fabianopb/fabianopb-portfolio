class AddDatesToProjects < ActiveRecord::Migration
  
  def up
    add_column("projects", "duration", :string, :after => "abstract")
  end
  
  def down
    remove_column("projects", "duration")
  end
  
end
