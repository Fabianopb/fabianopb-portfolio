class PublicController < ApplicationController
  
  layout 'public'
  
  def index
    @skills = Skill.sorted
    @projects = Project.sorted
  end

  def show
    @project = Project.find(params[:id])
  end
  
  def next_proj
    @project = Project.where("id > ?", params[:id]).first
    redirect_to(:action => 'show', :id => @project.id)
  end
  
  def prev_proj
    @project = Project.where("id < ?", params[:id]).last
    redirect_to(:action => 'show', :id => @project.id)
  end
  
end
