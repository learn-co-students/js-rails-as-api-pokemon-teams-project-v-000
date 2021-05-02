class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
    render json: trainers, include: [:pokemons]
  end

  def show
    trainer = Trainer.find_by(id: params[:id])
    # render json: sighting, include: [:bird, :location], except: [:updated_at]
    render json: trainer, include: [:pokemons]
  end
end
