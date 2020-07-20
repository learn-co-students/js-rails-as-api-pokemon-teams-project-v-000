class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
    render json: trainers.to_json
  end

  def show
    trainer = Trainer.find_by(id: params[:id])
    if trainer
      render json: trainer.to_json
    else
      render json: { message: 'No trainer found with that id' }
    end
  end
end
#
# render json: trainer.to_json(:include => {
#   :id, :name})
#
# {"id":1,
#   "name":"Natalie",
#   "created_at":"2020-05-29T15:45:23.757Z",
#   "updated_at":"2020-05-29T15:45:23.757Z"}
