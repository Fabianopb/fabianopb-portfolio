class BasicInfoController < ApplicationController
  
  layout 'admin'
  
  before_action :confirm_logged_in
  
  def index
    @infos = BasicInfo.sorted
  end

  def edit
    @info = BasicInfo.find(params[:id])
  end
  
  def update
    @info = BasicInfo.find(params[:id])
    if @info.update_attributes(info_params)
      redirect_to(:action => 'index')
    else
      render('edit')
    end
  end
  
  private
  
  def info_params
    params.require(:basic_infos).permit(:header, :hero, :caption, :quote, :story)
  end
  
end
