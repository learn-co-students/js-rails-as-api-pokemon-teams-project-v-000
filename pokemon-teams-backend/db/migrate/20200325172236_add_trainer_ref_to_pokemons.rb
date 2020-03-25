class AddTrainerRefToPokemons < ActiveRecord::Migration[6.0]
  def change
    add_reference :pokemons, :trainer, null: false, foreign_key: true
  end
end
