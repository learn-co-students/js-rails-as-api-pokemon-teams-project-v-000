require 'faker'
class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        render json: trainers.to_json(
            :include =>{
                :pokemons => {
                    :except=>[:created_at, :updated_at]
                }
            },
            except:[:created_at, :updated_at])
    end

    def create
        trainer = Trainer.find_by(id: params[:id])

        if(trainer && trainer.pokemons.size<6)
            new_pokemon = trainer.pokemons.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: trainer.id)

            render json: new_pokemon,except:[:created_at, :updated_at]
        else
            render json: {message: "Reached max. number of pokemons per trainer."}
        end
    end
    def delete
        # byebug
        trainer = Trainer.find_by(id: params[:trainer_id])
        if trainer
            pokemon = trainer.pokemons.find_by(id: params[:id])
            if pokemon.nil?
                render json: {message: "Pokemon not found!"}
            else
                pokemon.delete
                render json: pokemon,except:[:created_at, :updated_at]
            end
        else
            render json: {message: "Trainer not found!"}
        end
    end 
end
