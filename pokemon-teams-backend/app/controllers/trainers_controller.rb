class TrainersController < ApplicationController

  def index
    trainers = Trainer.all
    # render json: TrainersSerializer.new(trainers)
    render json: trainers, include: [:pokemons]

  end

  def show
    trainer = Trainer.find_by(id: params[:id])
    render json: trainer, include: [:pokemons]
    # render json: trainer

  end

end
