class SkillsController < ApplicationController
  
  layout 'admin'
  
  before_action :confirm_logged_in
  
  def index
    @skills = Skill.sorted
  end

  def new
    @skill = Skill.new
  end
  
  def create
    @skill = Skill.new(skill_params)
    if @skill.save
      redirect_to(:action => 'index')
    else
      render('new')
    end
  end

  def edit
    @skill = Skill.find(params[:id])
  end
  
  def update
    @skill = Skill.find(params[:id])
    if @skill.update_attributes(skill_params)
      redirect_to(:action => 'index')
    else
      render('edit')
    end
  end

  def delete
    @skill = Skill.find(params[:id])
  end
  
  def destroy
    Skill.find(params[:id]).destroy
    redirect_to(:action => 'index')
  end
  
  private
  
  def skill_params
    params.require(:skill).permit(:skill_name, :level)
  end
  
end
