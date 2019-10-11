class TrainersController < ApplicationController
	
  def index
    trainers = Trainer.all
    render json: TrainerSerializer.new(trainers)
  end

  def new 
    trainer = Trainer.new
  end

  def show  
  	trainer = Trainer.find_by(id: params[:id])
    render json: TrainerSerializer.new(trainer)
  end

  def create
    trainer = Trainer.new(trainer_params)
    
    if trainer.valid?
      trainer.save
      render json: TrainerSerializer.new(trainer), status: :accepted
    else 
      render json: { errors: trainer.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def update
  	trainer = Trainer.find_by(id: params[:id])
    trainer.update(trainer_params)
    if trainer.save
      render json: TrainerSerializer.new(trainer), status: :accepted
    else
      render json: { errors: trainer.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def trainer_params
    params.permit(:name)
  end

end
