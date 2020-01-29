class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
    render json: trainers, except: [:created_at, :updated_at]
  end

  def show
    trainer = Trainer.find_by(id: params[:id])
    if trainer
      render json: trainer.to_json(:include => {:pokemons => {:only => [:nickname, :species, :id]}}, :except => [:updated_at, :created_at])
    else
      render json: { message: 'No sighting found with that id' }
    end
  end

end
