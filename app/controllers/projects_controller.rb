class ProjectsController < ApplicationController
  
  layout 'admin'
  
  before_action :confirm_logged_in
  
  def index
    @projects = Project.sorted
  end
  
  def show
    @project = Project.find(params[:id])
  end

  def new
    @project = Project.new
  end
  
  def create
    @project = Project.new(project_params)
    if @project.save
      redirect_to(:action => 'index')
    else
      render('new')
    end
  end

  def edit
    @project = Project.find(params[:id])
  end
  
  def update
    @project = Project.find(params[:id])
    if @project.update_attributes(project_params)
      redirect_to(:action => 'index')
    else
      render('edit')
    end
  end

  def delete
    @project = Project.find(params[:id])
  end
  
  def destroy
    Project.find(params[:id]).destroy
    redirect_to(:action => 'index')
  end
  
  private
  
  def project_params
    params.require(:project).permit(:title, :caption, :abstract, :text, :facts, :image1, :image2, :thumbnail)
  end
  
end
