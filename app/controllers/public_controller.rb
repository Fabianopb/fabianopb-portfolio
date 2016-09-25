class PublicController < ApplicationController
  
  layout 'public'
  
  def index
    @badges = Badge.sorted
    @projects = Project.sorted
    @info = BasicInfo.sorted.first
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
