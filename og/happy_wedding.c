/*  Copyright © 2017 Federico Gianno

    happy-marriage is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    happy-marriage is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with happy-marriage. If not, see <http://www.gnu.org/licenses/>. */


#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

//N = Number of guests;
//K = Number of tables;
//M = Tables seats;

float humor_max=INT_MIN;

int **allocate2d(int dim1, int dim2);
void free2d(int **matr, int dim);
void init(FILE *fp, int **matr, int n);
void mood(int pos, int *sol, int **matr, int *bestsol, int n, int k, int m);

int main()
{
    FILE *fp;
    int i=0, j=0, n=0, k=0, m=0;
    int **matr, *sol, *bestsol;

    if((fp=fopen("banquet.txt", "r"))==NULL){
        fprintf(stderr, "Error: can't open file 'banquet.txt'\n");
        exit(-1);
    }
    fscanf(fp, "%d %d %d", &n, &k, &m);

    matr = allocate2d(n, n);
    init(fp, matr, n);
    fclose(fp);

    sol = malloc(n*sizeof(int));
    bestsol = malloc(n*sizeof(int));

    mood(0, sol, matr, bestsol, n, k, m);

    fprintf(stdout, "Best solution with average mood %.2f:\n", humor_max);
    for(i=0; i<k; i++){
        fprintf(stdout, "Table %d { ",i+1);
        for(j=0; j<n; j++)
            if(bestsol[j]==i)
                printf("%d ", j+1);
        fprintf(stdout, "}\n");
    }

    fprintf(stdout, "Deallocation...\n");
    free(sol);
    free(bestsol);
    free2d(matr, n);

    return 0;
}

int **allocate2d(int dim1, int dim2)
{
    int **matr, i=0;

    matr = malloc(dim1*sizeof(int));
    for(i=0; i<dim1; i++)
        matr[i] = malloc(dim2*sizeof(int));

    return matr;
}

void init(FILE *fp, int **matr, int n)
{
    int i=0, j=0;

    for(i=0; i<n; i++)
        for(j=0; j<n; j++)
            fscanf(fp, "%d", &matr[i][j]);
}

void mood(int pos, int *sol, int **matr, int *bestsol, int n, int k, int m)
{
    int i=0, j=0, t=0;
    int ris=0, tot=0, cnt_id=0, n_tab=k;
    float humor_tmp;

    if(pos>=n){
        for(i=0; i<k; i++){
            ris=0, cnt_id=0;
            for(j=0; j<n; j++){
                if(sol[j]==i){
                    cnt_id++;
                    if(cnt_id>m) return;
                    for(t=j+1; t<n; t++){
                        if(sol[t]==i)
                            ris += matr[j][t];
                    }
                }
            }
            if(cnt_id==0)
                n_tab--; //->empty table;
            tot += ris;
        }
        humor_tmp = (float)(tot/n_tab);
        if(humor_tmp>humor_max){
            humor_max=humor_tmp;
            for(i=0; i<n; i++)
                bestsol[i]=sol[i];
        }
        return;
    }

    for(i=0; i<k; i++){
        sol[pos] = i;
        mood(pos+1, sol, matr, bestsol, n, k, m);
    }
}

void free2d(int **matr, int dim)
{
    int i=0;

    for(i=0; i<dim; i++)
        free(matr[i]);
    free(matr);
}
