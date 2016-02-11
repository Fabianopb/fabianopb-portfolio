class BasicInfo < ActiveRecord::Base
    
    scope :sorted, lambda { order("basic_infos.id ASC") }
    
end
