class Project < ActiveRecord::Base
    
    scope :sorted, lambda { order("projects.id ASC") }
    
end
