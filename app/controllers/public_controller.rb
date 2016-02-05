class PublicController < ApplicationController
  
  layout 'public'
  
  def index
    @skills = Skill.sorted
  end

  def show
  end
  
end
