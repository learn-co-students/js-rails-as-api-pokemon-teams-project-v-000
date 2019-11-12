class TrainersController < ApplicationController
  #see all trainers on current team of pokemon

  def show
    trainer = Trainer.find_by(id: params[:id])
    render json: trainer.to_json
  end

  def index
    trainers = Trainer.all
    render json: trainers.to_json
  end
end
