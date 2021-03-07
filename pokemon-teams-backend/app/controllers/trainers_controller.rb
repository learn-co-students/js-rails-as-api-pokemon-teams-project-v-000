class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
    render json: TrainerSerializer.new(trainers).to_serialized_json
  end

  def show
    trainer = Trainer.find_by(id: params[:id])
    if trainer
      render json: TrainerSerializer.new(trainer).to_serialized_json
    else
      render json: {error: "Trainer not found with ID of #{params[:id]}!"} 
    end
  end
end
