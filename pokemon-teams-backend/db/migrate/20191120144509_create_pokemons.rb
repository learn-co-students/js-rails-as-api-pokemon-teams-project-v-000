class CreatePokemons < ActiveRecord::Migration
  def change
    create_table :pokemons do |t|
      t.string :species
      t.string :nickname
      t.references :trainer, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
