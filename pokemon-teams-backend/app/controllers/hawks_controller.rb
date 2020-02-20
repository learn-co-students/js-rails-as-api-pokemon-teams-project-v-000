class HawksController < ApplicationController
  def index
    hawks = Hawk.all
    render json: hawks.to_json(except: [:created_at, :updated_at])
  end


  def show
    hawk = Hawk.find_by(id: params[:id])
    if hawk
      render json: {id: hawk.id, known_as: hawk.name, technical_classification: hawk.species }
    else
      render json: { message: 'Hawk not found' }
    end
  end

  def create
    hawkData = {
      name: "A hardwired value for a new hawk's name"
    }
      Hawk.create(hawkData)
      #render json: hawk
  end

end



# NOTE: this create action works to create a new hawk with the hard-coded
# name & species values
# def create
#   hawkData = {
#     name: "Sylvester",
#     species: "Black-Hawk"
#   }
#     Hawk.create(hawkData)
#
# end
